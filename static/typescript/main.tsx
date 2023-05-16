
import TempHumViewer from "./components/TempHumViewer";
import { createRoot } from 'react-dom/client';
import * as React from "react";

createRoot(document.getElementById('tempHumViewer') as HTMLElement).render(
  <TempHumViewer />
);   