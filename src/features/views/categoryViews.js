import { createButton, createResetButton   } from '../../buttons';
import { switchView } from '../../view';

export function createInitialView() {
  const initialView = document.createElement("div");
  initialView.id = "view-initial";
  initialView.classList.add("accessibility-view");

  const showVistualButton = createButton("show-Vistual", "Capacidad Diversa Visual", () => {
    switchView("view-categories");
  });

  const showCategories2Button = createButton("show-Vistual", "Capacidad Diversa Cognitiva o Neurológica", () => {
    switchView("view-categories1");
  });

  initialView.appendChild(showVistualButton);
  initialView.appendChild(showCategories2Button);

  return initialView;
}

export function createCategoriesView() {
  const categoriesView = document.createElement("div");
  categoriesView.id = "view-categories";
  categoriesView.classList.add("accessibility-view", "hidden");
  categoriesView.setAttribute("aria-hidden", "true");

  categoriesView.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("view-initial")));
  categoriesView.appendChild(createResetButton());

  categoriesView.append(
    createButton("btn-visual", "Baja Visión", () => switchView("view-visual")),
    createButton("btn-total-blindness", "Ceguera Total", () => switchView("view-total-blindness")),
    createButton("btn-color-blindness", "Daltonismo", () => switchView("view-color-blindness")),
    createButton("btn-color-perception", "Percepción del Color", () => switchView("view-color-perception")),
  );

  return categoriesView;
}

export function createCategoriesView1() {
  const categoriesView1 = document.createElement("div");
  categoriesView1.id = "view-categories1";
  categoriesView1.classList.add("accessibility-view", "hidden");
  categoriesView1.setAttribute("aria-hidden", "true");

  categoriesView1.appendChild(createButton("back-to-menu", "⬅ Volver", () => switchView("view-initial")));
  categoriesView1.appendChild(createResetButton());

  categoriesView1.append(
    createButton("btn-asperger", "Trastorno del Asperger Aprendizaje", () => switchView("view-asperger")),
    createButton("btn-s-down", "Sindrome De Down", () => switchView("view-s-down")),
    createButton("btn-hiperactividad", "Trastorno de Déficit de Atención e Hiperactividad", () => switchView("view-hiperactividad")),
    createButton("btn-color-perception", "gdfgdfg del Color", () => switchView("view-color-perception")),
  );

  return categoriesView1;
}