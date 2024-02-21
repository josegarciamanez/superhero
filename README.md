# Heroes app

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/josegarciamanez/superhero)


### Instalar el Sandbox

```
cd angular17
npm install
```

### Arrangar el servidor

```
npm start
```

### Lanzar tests

```
npm run test
```

### Eslint

```
npm run lint
```

### Se han usado las siguientes tecnologías en el proyecto:

- Angular 17
- Jest (tests unitarios)
- eslint
- prettier
- Angular Material
- Sweet Alert

##### Notas aclaratorias:
- Se han usado standalone components ya que es una funcionalidad bastante estable en la v17 de Angular.
- Se ha optado por utilizar behaviorSubject/Observables en lugar de Signals ya que se piensa que es una funcionalidad aun joven y no sería conveniente llevarlo a producción hasta pasado un tiempo (me sigue gustando más RxJs)
- La parte de edición quedaría darle un repaso ya que no está del todo fina pero pienso que podría valer para ver como se está usando la tecnología en sí.