<template>
  <main class="home">
    <div class="home__content">
      <h1 class="home__title">Herzlich Willkommen</h1>
      <p class="home__description">
        Hier hast du die Kontrolle über deine Aufgaben. Speichere, organisiere und erledige sie, egal ob Großprojekt oder tägliche To-Dos.
        Verwalte deine Liste mühelos und behalte den Überblick über deine Fortschritte. Mit einfachen Funktionen zum Hinzufügen und Abhaken bleibst du stets auf Kurs.
        Mach dir das Leben leichter und fokussiere dich auf das, was wichtig ist. Starte jetzt und mach dich bereit, produktiver zu sein!
      </p>
      <i class="ri-survey-line"></i> <!-- Fügt das Icon hinzu -->
    </div>
  </main>
</template>

<style scoped>

.home {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  padding-top: 10%;
  box-sizing: border-box;
  height: 85vh;
}

.home__content {
  max-width: 800px; /* Begrenzt die Breite des Inhalts */
  text-align: center;
}

.home__title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.home__description {
  font-size: 1.2rem;
}

.ri-survey-line {
  color: white; /* Setzt die Farbe des Icons auf Weiß */
  font-size: 5em; /* Setzt die Größe des Icons */
}

</style>