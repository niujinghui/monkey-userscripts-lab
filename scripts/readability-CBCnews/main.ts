import React from "react"
import { createRoot } from "react-dom/client"
import { Panel } from "../../shared/ui/Panel"

const container = document.createElement("div")
document.body.appendChild(container)

createRoot(container).render(<Panel />)
