import { useChannel } from "@storybook/preview-api";
import type {
  Renderer,
  PartialStoryFn as StoryFunction,
} from "@storybook/types";
import { STORY_CHANGED } from "@storybook/core-events";
import { EVENTS } from "./constants";

export const withRoundTrip = (storyFn: StoryFunction<Renderer>) => {
  const emit = useChannel({
    [EVENTS.REQUEST]: () => {
      emit(EVENTS.RESULT, {
        cssClass:[]
      });
    },
    [EVENTS.CHANGE]: () => {
      // emit(EVENTS.RESULT, {
      //  cssClass:[]
      // });
    },
    [EVENTS.CLEAR]: () => {
      emit(EVENTS.RESULT, {
        cssClass:[]
      });
    },
  });

  return storyFn();
};
