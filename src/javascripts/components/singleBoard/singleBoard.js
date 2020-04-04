import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

const hideBoardsDiv = () => {
  const boardsDiv = $('#boards');
  boardsDiv.addClass('hide');
};

const closeSingleViewEvent = () => {
  utils.printToDom('single-view', '');
  const boardsDiv = $('#boards');
  boardsDiv.removeClass('hide');
};

const removePin = (e) => {
  const pinId = e.target.closest('.card').id;
  pinData.deletePin(pinId)
    .then(() => closeSingleViewEvent())
    .catch((err) => console.error('delete pins failed', err));
};

const singleBoardView = (e) => {
  const boardId = e.target.closest('.card').id;
  pinData.getPins()
    .then((pins) => {
      let domString = '<div><button id="close-single-view" class="btn btn-outline-dark mt-3 ml-2"><i class="far fa-times-circle"></i></button></div>';
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          domString += `<div class="d-flex flex-wrap col-md-4 mt-3">
          <div class="card" id="${pin.id}">
          <img src="${pin.imageUrl}" class="card-img-top" alt="...">
          <div class="card-body d-flex">
            <h5 class="card-title">${pin.name}</h5>
            <button class="btn btn-outline-danger ml-auto delete-pin-btn"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
        </div>`;
        }
      });
      hideBoardsDiv();
      utils.printToDom('single-view', domString);
      $('#close-single-view').click(closeSingleViewEvent);
      $('body').on('click', '.delete-pin-btn', removePin);
    })
    .catch((err) => console.error('problem with get pins', err));
};

export default { singleBoardView };
