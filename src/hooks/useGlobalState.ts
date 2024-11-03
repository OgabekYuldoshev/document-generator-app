"use client"
import useLocalStorage from "use-local-storage"
import pkg from "../../package.json"
import constate from "constate"

const [GlobalStateProvider, useGlobalState] = constate(() => {
  const [isCollapsed, setCollapsed] = useLocalStorage(`${pkg.name}.collapsed`, false);

  return {
    isCollapsed,
    setCollapsed
  }
})

export { GlobalStateProvider, useGlobalState }