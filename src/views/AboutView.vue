<template>
  <main class="about">
    <div class="about__content">
      <h1 class="about__title">Über uns</h1>
      <p class="about__description">
        Die ToDo-Verwaltungsapp wurde mit Leidenschaft und Engagement von Mustafa Nazari und Nikita Mantel entwickelt. Unser Ziel war es, eine einfach zu bedienende Plattform zu schaffen, die es jedem ermöglicht, Aufgaben effizient zu organisieren und zu verwalten.
        Mit einer Kombination aus Nutzerfreundlichkeit und leistungsstarken Funktionen wollen wir das Leben unserer Nutzer erleichtern. Wir glauben an die Kraft einer strukturierten ToDo-Liste, um den Alltag zu vereinfachen und Ziele zu erreichen.
        Unser Team arbeitet kontinuierlich daran, die App zu verbessern und sie zu einem unverzichtbaren Werkzeug für Ihre tägliche Produktivität zu machen. Vielen Dank, dass Sie Teil unserer Reise sind, um das Erledigen von Aufgaben einfacher und effektiver zu gestalten.
      </p>
    </div>
  </main>
</template>

<style scoped>
.about {
  display: flex;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
}

.about__content {
  max-width: 800px; /* Begrenzt die Breite des Inhalts */
  text-align: center;
}

.about__title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.about__description {
  font-size: 1.2rem;
}
</style>