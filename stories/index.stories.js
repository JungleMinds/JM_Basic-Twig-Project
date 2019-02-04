import { storiesOf, setAddon } from "@storybook/html";
import { withKnobs, text } from "@storybook/addon-knobs";

// setAddon(knobsAddon);

// load app
import "../src/app";

// load components
import icon from "../src/components/icon/icon.twig";
import button from "../src/components/button/button.twig";

const stories = storiesOf("Demo", module);

stories.addDecorator(withKnobs);

stories.addDecorator((story, config) => {
  window.dispatchEvent(new Event("reload"));
  return story();
});

stories
  .add("icon", () => icon({ label: "i" }))
  .add("button", () =>
    button({ arr: [1, 2, 3, 4, text("rilli", "testText")] })
  );
