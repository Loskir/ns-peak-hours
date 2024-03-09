# NS Peak Hours

A small pet-project for checking if it's currently peak hours for NS (Dutch railway company) tariffs.

[Try it yourself](https://ns-peak-hours.vercel.app)

## Technical stuff

> All sized imply GZIP compression unless specified otherwise.

### Features

- Fully typed
- Uses [`vite`](https://vitejs.dev/) for bundling
- Uses [`vitest`](https://vitest.dev/) for unit tests
- Timezone-agnostic calculation: works regardless of your device timezone
- Uses [`nanostores`](https://github.com/nanostores/nanostores) for state management
- Uses [`size-limit`](https://github.com/ai/size-limit) for controlling bundle size
- Implementations in plain JS, Preact, Svelte, and Solid

### Choosing a date manipulation library

At first I used [`luxon`](https://moment.github.io/luxon) as I had a very positive experience with it.
However, unfortunately it contributed more than 20kB to the bundle size.
Since for this project I've decided to try to keep bundle size as low as possible, I knew I'll have to switch.

I rewrote the code, using two very similar libraries: [`date-fns`](https://date-fns.org/) and [`@formkit/tempo`](https://tempo.formkit.com/).
Both of them use an approach of providing individual functions for each operation and returning a plain `Date` object in each one.
Naturally, I didn't want to ship two almost identical libraries at the same time.
However, I couldn't simply choose one, as neither library met all my requirements.

I needed two non-obvious features: timezone support and duration formatting.
Firstly, I needed to be able to determine whether a given date was before or after 6:30 in Dutch time or not.
Secondly, I wanted to be able to format the time difference between two dates like "5 hours 32 minutes 13 seconds".
And so, `date-fns` didn't support timezones and `@formkit/tempo` didn't support duration formatting.
I actually conducted several experiments to see how different combinations of these libraries affected bundle size (tempo for tz, date-fns for manipulation and formatting, or tempo for tz and manipulation, and date-fns for formatting), but ultimately ended up with implementing a duration formatter myself and settled on using tempo.

However, soon I found out that timezones weren't working properly.
See, the main idea behind these libraries is that there are no wrapper classes and they operate purely on plain `Date`s.
And I needed timezone-specific time manipulations, like "get current date and set time to 9:00 in Dutch time".
This seems easy to say, but it was almost impossible to implement using this approach.
`Date` objects do not hold any information about the timezone and always use the system's value for operations like `setHours`.
So if I call `date.setHours(9)`, it will always set it to 9 in **local time**, not Dutch or even UTC.
I wasted a lot of time trying to fix it, but to no avail.

Then I started looking for a library that would be both tree-shakeble and convenient to use, and I remembered about [`dayjs`](https://day.js.org/).
It turned out to be just what I needed!
I quicky rewrote my code using this library without any problems, and was surprised to see that it added only about 5kB to my bundle size.

Here's a comparison table:

| Library        | tree-shakeable | timezones                                               | durations |
| -------------- | -------------- | ------------------------------------------------------- | --------- |
| luxon          | ❌ (20kB)      | ✅                                                      | ✅        |
| date-fns       | ✅             | ❌ [*](https://github.com/marnusw/date-fns-tz/pull/265) | ✅        |
| @formkit/tempo | ✅             | ✅ *                                                    | ❌        |
| dayjs          | ~ (2kB+plugins)        | ✅                                                      | ✅        |

### Different approaches to UI

In this project I decided to explore the possibilities offered by Vite.
I implemented the same behavior in 3 UI approaches:

- Plain JS
- Preact
- Svelte
- Solid

> State management is done using `nanostores` in all cases.

#### Plain JS

What can I say?
It was extremely painful.
You either declare your layout in HTML and change it element by element or make your layout entirely through JS which is so inconvenient.

At some point, I used [`@kitajs/html`](https://github.com/kitajs/html) which is a library that renders JSX into strings.
It definitely was more convenient than writing HTML as strings (you don't lose completions in your IDE which is very important to me).
But still it wasn't quite as convenient I hoped, because I still couldn't easily manage the elements I was creating the way I would with `document.createElement`. For example:

```jsx
const el = <span></span>
el.addEventListener(...) 
// ^^^ you can't do this because el is a string
//     "<span></span>" and not an HTMLElement
return <div>{el}</div>
```

It wasn't very helpful and also added around 2kB the bundle size so I ditched it.

#### Preact

After struggling with plain JS I decided to give `preact` a try.
I was afraid that it would increase the bundle size a lot, but it only increased by ~5.4kB (for a total bundle size of 11.89kB).
That's a lot, but not too much for such a powerful library.

#### Svelte

After that I decided to try Svelte just for fun.
I've used it in the past, but my experience wasn't great, so I didn't expect much.
But I was completely amazed to see a 8.68kB bundle with Svelte only taking up less than 2kB!

#### Solid

Not much to say, a solid choice (pun intended).
Bundle size: 11.15kB.

### Bundle size comparison

> All versions use `nanostores` and `dayjs`

| UI library | Size (gzip) |
| ---------- | ----------- |
| Plain JS   | 6.48kB      |
| Svelte     | 8.68kB      |
| Solid      | 11.15kB     |
| Preact     | 11.89kB     |
