<h1 align='center'>
  📜 <br>
  QuestMate
</h1>
<p align="center">
  Multi-User Collaborative text-based adventure app with AI-powered adventures.
  <br> <br>
      <strong>App:</strong> <a href="https://questmate.art/"> https://questmate.art/ </a> <br>
  <strong>Proces:</strong> <a href="https://questmate.art/proces/index.html"> https://questmate.art/proces/index.html </a>
</p>

<div align="center">

![Scherm­afbeelding 2023-05-12 om 13.41.54.png](readme%2FScherm%C2%ADafbeelding%202023-05-12%20om%2013.41.54.png)

</div>

## Table of Contents 🗂
- [Description 📝](#description)
- [Features 🌟](#features)
- [Installeren 🔍](#install)
- [Gebruiken 🔧](#usage)
- [Data Life Cycle ♻️ & API 📡](#data-life-cycle)


## Description 📝
QuestMate is een multi-user text-based adventure game waarin je samen met je vrienden 
een digitale quest beleefd. Met de kracht van Artificiële Intelligentie biedt QuestMate
rijk gedetailleerde werelden waarin je samen cruciale beslissingen kunt maken.

Je collectieve keuzes leidden tot een uniek avontuur, elke keer weer.

### Features 🌟
- Multi-user
- AI-powered 
- Text-based
- Real-time

## Installeren 🔍
1. Install [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/).
2. Clone this repository

This project exists out of two parts: A front-end (client) and a back-end (server).

### Client
1. Navigate to the client folder
2. Run `npm install` to install all dependencies
3. Run `npm run dev` to start the development server
4. Navigate to `localhost:3000` in your browser
5. Enjoy!

### Server
1. Navigate to the server folder
2. Run `npm install` to install all dependencies
3. Run `npm run start` to start the server
4. Enjoy!

## Gebruiken 🔧

Navigeer naar de [app](https://questmate.art/) en vul een gebruikersnaam in. 
Je kunt nu een quest starten of een quest joinen. Als je een quest start, krijg 
je een code die je kunt delen met je vrienden. Als je een quest joinet, vul je de 
code in die je van je vrienden hebt gekregen.

<div align="center">

![Scherm­afbeelding 2023-05-12 om 13.58.41.png](readme%2FScherm%C2%ADafbeelding%202023-05-12%20om%2013.58.41.png)

</div>

Vervolgens wacht je op je vrienden en kun je beginnen met de quest door op "Start Adventure" te klikken:

<div align="center">

![Scherm­afbeelding 2023-05-12 om 14.00.19.png](readme%2FScherm%C2%ADafbeelding%202023-05-12%20om%2014.00.19.png)

</div>

Elke keer krijg je een korte paragraaf te zien en vervolgens 3 keuzes waarop je kunt stemmen. De optie met de meeste stemmen wordt gekozen.

<div align="center">

![Scherm­afbeelding 2023-05-12 om 14.03.22.png](readme%2FScherm%C2%ADafbeelding%202023-05-12%20om%2014.03.22.png)

</div>

## Data Life Cycle ♻️ & API 📡

_Mocht je meer informatie willen over de data life cycle, de API en m'n 
proces verwijs ik graag en met enige nadruk naar de 
[proces pagina](https://questmate.art/proces/index.html). 
Hierin staat alles met grote detail beschreven._

Voor dit project heb ik gebruik gemaakt van de alombekende GPT-3 API van OpenAI als 
externe databron voor het genereren van het avontuur en de opties.

<div align="center">

![datamodel.drawio.png](readme%2Fdatamodel.drawio.png)

</div>

## Wanna Haves 🌠
_Dingen die ik nog wil toevoegen:_
- [ ] Mobile Friendly maken
- [ ] Geschiedenis van het verhaal beschikbaar stellen
- [ ] Zien welke optie geselecteerd is
- [ ] Optie om een nieuw avontuur te starten
- [ ] Optie om thema's mee te geven
- [ ] Gebruikers later in de game nog laten kunnen joinen
- [ ] Aparte Gamemode: Cards of Humanity achtig iets waarbij iedereen iets typed en dan stemmen op de volgende
- [ ] Betaalde feature: Je eigen optie mee kunnen geven
- [ ] Betaalde feature: Image Generation als achtergrond
- [ ] Iedereens muis tonen om nadruk te leggen op het multi-user gedeelte
- [ ] Voorlezen van de tekst door een AI
- [ ] Optie om een quest te starten met een random groep mensen

_Codematig:_
- [ ] State-Management puur op de server
- [ ] Versimpelen van sockets
- [ ] Complete Refactoring van de code

## Credits
- [OpenAI](https://openai.com/) for their API
- [Socket.io](https://socket.io/) for their library
- [NodeJS](https://nodejs.org/en/) for their runtime
- [NPM](https://www.npmjs.com/) for their package manager
- [React](https://reactjs.org/) for their library
- [ChatGPT](https://chat.openai.com/) for ideation and code-help

## License
GNU GENERAL PUBLIC LICENSE v3.0

Freedom to use, modify, and distribute software while 
maintaining openness and requiring distribution of source code.