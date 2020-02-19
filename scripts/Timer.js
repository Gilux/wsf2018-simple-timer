class Timer {
  constructor($el, seconds) {
    // Convention : $ devant un nom de variable : un élément DOM
    // Ici on considère qu'on aura seulement 1 timer par page, sinon l'élément DOM pourrait être un attribut de l'objet
    this.$el = $el
    // Date de la fin du timer
    this.end_date = new Date()
    this.end_date.setSeconds(this.end_date.getSeconds() + seconds)

    // Si le timer a été mis en pause, enregistrer quand
    this.date_paused = null

    // On ajoute les écouteurs sur les 3 boutons du composant
    // this.$el.querySelector('.pause').addEventListener("click", () => { this.pause() })
    // this.$el.querySelector('.play').addEventListener("click", () => { this.play() })
    // this.$el.querySelector('.add').addEventListener("click", () => { this.addTime(60) })
  }

  // Initialise le timer
  start() {
    this.tick()
  }

  /*
    Met en pause le timer
    Comme la fin du timer est stockée sous forme de date, il faut bien penser à sauvegarder le moment où le timer a été mis en pause
    pour pouvoir avancer la fin d'autant de temps lorsqu'on le remettra en route
  */
  pause() {
    this.date_paused = new Date()
    window.clearTimeout(this.timeout)
  }

  // Relancer après une mise en pause
  play() {
    if (this.date_paused) {
      var milliseconds_paused = (Date.now() - this.date_paused)
      this.end_date.setMilliseconds(this.end_date.getMilliseconds() + Math.floor(milliseconds_paused))
      this.date_paused = null
      this.tick()
    }
  }

  // Ajoute des secondes au timer
  addTime(seconds) {
    this.end_date.setSeconds(this.end_date.getSeconds() + seconds)

    if (this.date_paused) {
      var milliseconds_paused = (Date.now() - this.date_paused)
      this.end_date.setMilliseconds(this.end_date.getMilliseconds() + Math.floor(milliseconds_paused))
    }

    this.tick()
  }

  // On délègue entièrement l'affichage du DOM à cette fonction
  // Elle va transformer un objet Date en "HH:MM:SS"
  updateDOM(dDiff) {
    let $timer = this.$el.querySelector(".timer")

    /*
      Comme la différence est stockée comme une date,
      on peut récupérer les heures, minutes, secondes plus simplement qu'avec des formules type modulo et division
      /!\ Bien récupérer le UTCHours ! Sinon, il y aura un décalage de +1 ou +2h selon le fuseau horaire (heure d'été/hiver)

      padStart = ajouter des "0" devant le chiffre si nécessaire, de façon à avoir 2 caractères
    */

    let time_parts = [
      dDiff.getUTCHours().toString().padStart(2, "0"),
      dDiff.getUTCMinutes().toString().padStart(2, "0"),
      dDiff.getUTCSeconds().toString().padStart(2, "0")
    ]
    $timer.innerHTML = time_parts.join(":") // Façon plus élégante de concaténer des éléments de cette taille

    // Afficher le timer par défaut en blanc, et en rouge si moins de 5mn restantes
    $timer.style.color = "white"
    if (dDiff.getTime() < (300000)) {
      $timer.style.color = "red"
    }
  }

  // Recalcule à chaque seconde le temps restant, et met à jour l'élément DOM en conséquence
  tick() {
    // On nettoie le timeout courant
    if (this.timeout != null) {
      window.clearTimeout(this.timeout)
      this.timeout = null
    }

    // diff_milliseconds: le nombre de ms entre la date de fin et le moment présent
    let diff_milliseconds = this.end_date - Date.now()

    // On crée un objet date qui contient en fait une durée
    // Par exemple si on a 1h restante sur le timer, dDiff vaudra 01/01/1970 01:00:00  
    let dDiff = new Date(diff_milliseconds)

    // On évite d'entrer dans le négatif lors de la dernière seconde du timer
    dDiff.setTime(Math.max(0, dDiff.getTime()))

    if(dDiff.getTime() <= 0) {

    }

    // Mettre à jour l'affichage
    this.updateDOM(dDiff)

    // Appeler la même fonction 1s après, sauf si le timer est en pause ou terminé
    // Stocker la référence du setTimeout dans l'objet, car on doit pouvoir l'arrêter sans attendre la seconde suivante si on met le timer en pause ou on lui ajoute du temps
    if (!this.date_paused && diff_milliseconds >= 0) {
      this.timeout = window.setTimeout(this.tick.bind(this), 1000)
    }
  }
}
