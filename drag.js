const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

draggables.forEach((task) => {
  // Na hora que selecionamos o elemento arrastável
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  // Na hora que soltamos o elemento arrastável
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppables.forEach((zone) => {
  // console.log(zone);
  // Quando o elemento arrastável está sobre uma zona válida (onde pode ser dropado)
  zone.addEventListener("dragover", (e) => {
    // console.log(zone) // elemento selecionado
    e.preventDefault();
    // mandando para essa função a zona, ou seja o elemento arrastável selecionado e o eixo Y do mesmo
    const bottomTask = insertAboveTask(zone, e.clientY);
    // console.log(e.clientY);
    // Elemento que é colocado para baixo pelo elemento arrastável
    // console.log(bottomTask);
    // elemento que foi selecionado para ser arrastado
    const curTask = document.querySelector(".is-dragging");
    // console.log(curTask);
    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  // pegando o elemento arrastável selecionado em questão (qnd está no estado arrastável)
  const els = zone.querySelectorAll(".task:not(.is-dragging)");
  // console.log(els)

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  // Pegando as task que não estão selecionadas, mas são do mesmo grupo, ex: se tiver as tasks 1 2 3 e eu selecionar a 2
  // essas tasks ficarão selecionando os elementos 1 e 3;
  els.forEach((task) => {
    // console.log(task);
    // Retorna o tamanho e aposição de um elemento em relação ao viewport, pegando apenas o top
    const { top } = task.getBoundingClientRect();
    // console.log(task.getBoundingClientRect())
    // pegando a posição e.clientY, ou seja o eixo Y do elemento em questão, pegando a deslocação
    const offset = mouseY - top;
    // console.log(offset);

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  // Essa função no fim das contas retorna apenas a task que foi substituida pela outra, ou seja, foi sobreposta e colocada para baixo pelo elemento arrastável
  // console.log(closestTask);
  return closestTask;
};
