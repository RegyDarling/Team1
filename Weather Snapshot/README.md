# Weather Snapshot

A React weather application that loads current conditions for Accra on startup and lets people look up another city through the Open-Meteo Geocoding and Forecast APIs.

## Run locally

```bash
yarn
yarn dev
```

## Structure

- `src/components`: reusable UI for the search field, result card, loading state, and errors.
- `src/services/weatherApi.js`: all Open-Meteo fetch and response validation logic.
- `src/App.jsx`: request state, initial fetch effect, refresh action, and search workflow.
