## API

### Props

| Attribute         | Description            |  Type            | Default                   |
| ------------- | ------------------ | ---------------- | ------------------------ |
| modelValue    | current progress percentage     | Number、Number[] | `0`                      |
| range         | Whether to enable dual slider mode | Boolean          | `false`                  |
| max           | maximum             | Number、String   | `100`                    |
| min           | minimum             | Number、String   | `0`                      |
| step          | step size               | Number、String   | `1`                      |
| disabled      | Whether to disable the slider       | Boolean          | `false`                  |
| vertical      | Whether to display vertically | Boolean | `false` |
| hiddenRange   | whether to hide range values     | Boolean          | `false`                  |
| hiddenTag     | whether to hide the label       | Boolean          | `false`                  |
| activeColor   | progress bar active color   | String           | `rgba(250, 44, 25, 1)`   |
| inactiveColor | Progress bar inactive color | String           | `rgba(255, 163, 154, 1)` |
| buttonColor   | button color           | String           | `rgba(250, 44, 25, 1)`   |
| marks | scale mark | Object{key: number} | {} |

### Events

| Event             | Description                     | Arguments        |
| ------------------ | ------------------------ | --------------- |
| onChange `v1.3.8`           | Triggered when the progress changes and the drag is over | value: progress |
| onDragStart `v1.3.8`        | Triggered when dragging starts           | -               |
| onDragEnd `v1.3.8`         | Triggered when the drag is over           | -               |

### Slots

| Name   | Description           |
| ------ | -------------- |
| button | custom slide button |
