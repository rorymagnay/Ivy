import React from "react"

declare module "react" {
  interface JSX {
    IntrinsicElements: any
  }
} 