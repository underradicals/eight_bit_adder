import {
  animateSwitchButton,
  computeDerivedState,
  getState,
  mapDomToDerivedState,
  mapDomToLocalState,
  mutateStylesState,
  registerDomNodes,
  select,
  setLocalState
} from "@/utils";



function handleButtonClickEvent(event: Event) {
  const target = event.target as HTMLElement;

  if (target.localName !== "button") return;

  const localState = getState(target);

  setLocalState(localState);

  const derivedState = computeDerivedState();
  const domNodes = registerDomNodes(target);

  mapDomToLocalState(domNodes, localState);
  mapDomToDerivedState(domNodes, derivedState);
  mutateStylesState(localState, domNodes);
  animateSwitchButton(target);
}

const App = select(".app");

function handleLoadEvent(app: HTMLElement) {
  return () => {
    app.addEventListener("click", handleButtonClickEvent);
  };
}

addEventListener("load", handleLoadEvent(App));
