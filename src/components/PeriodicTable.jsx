import React, { useState, useEffect } from 'react';
import { elements } from '../data/elements'; // Данные элементов
import { categoriesInfo } from '../data/categories-info';
import Modal from './Modal';
import '../styles/buttons.css';

export const PeriodicTable = () => {
  const [elementsData, setElementsData] = useState([]);
  const [selectedElement, setSelectedElement] = useState(elements[0]);
  const [showOnlyNobleGases, setShowOnlyNobleGases] = useState(false);
  const [showOnlyNonmetals, setShowOnlyNonmetals] = useState(false);
  const [showOnlySemimetals, setShowOnlySemimetals] = useState(false);
  const [showOnlyTransitionMetals, setShowOnlyTransitionMetals] =
    useState(false);
  const [showOnlyPostMetals, setShowOnlyPostMetals] = useState(false);
  const [showOnlyLantanoids, setShowOnlyLantanoids] = useState(false);
  const [showOnlyActinoids, setShowOnlyActinoids] = useState(false);
  const [showOnlyAlkaliEarthMetals, setShowOnlyAlkaliEarthMetals] =
    useState(false);
  const [showOnlyAlkaliMetals, setShowOnlyAlkaliMetals] = useState(false);
  const [showOnlyNonmetalsCategory, setShowOnlyNonmetalsCategory] =
    useState(false);
  const [showOnlyMetalsCategory, setShowOnlyMetalsCategory] = useState(false);
  const [showOnlyGases] = useState(false);
  const [showOnlySolid] = useState(false);
  const [showOnlyLiquid] = useState(false);
  const [showOnlyNA] = useState(false);
  const [highlightSolid, setHighlightSolid] = useState(false);
  const [highlightLiquid, setHighlightLiquid] = useState(false);
  const [highlightGases, setHighlightGases] = useState(false);
  const [highlightNA, setHighlightNA] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    setElementsData(elements);
  }, []);

  const handleClick = (element) => {
    setSelectedElement(element);
  };

  const getClassByCategory = (element) => {
    if (!element || !element.category) return '';

    return `
      ${element.category.includes('неметалл') ? 'nonmetalcat' : ''}
      ${element.category.includes('металл') ? 'metalcat' : ''}
    `;
  };

  const getClassByClassification = (element) => {
    if (!element || !element.classification) return '';

    return `
      ${element.classification.includes('неметаллы') ? 'nonmetal' : ''}
      ${element.classification.includes('полуметаллы') ? 'semimetals' : ''}
      ${
        element.classification.includes('переходные металлы')
          ? 'transition-metals'
          : ''
      }
      ${element.classification.includes('постметаллы') ? 'postmetals' : ''}
      ${element.classification.includes('лантаноиды') ? 'lantanoids' : ''}
      ${element.classification.includes('актиноиды') ? 'actinoids' : ''}
      ${
        element.classification.includes('щелочноземельные металлы')
          ? 'alkali-earth-metals'
          : ''
      }
      ${
        element.classification.includes('щелочные металлы')
          ? 'alkali-metals'
          : ''
      }
      ${
        element.classification.includes('благородные газы') ? 'noble-gases' : ''
      }
      ${element.classification.includes('none') ? 'none' : ''}
       ${
         highlightSolid && element.state.includes('твердое')
           ? 'highlightsolid'
           : ''
       }
      ${
        highlightLiquid && element.state.includes('жидкость')
          ? 'highlightliquid'
          : ''
      }
      ${highlightGases && element.state.includes('газ') ? 'highlightgases' : ''}
      ${highlightNA && element.state.includes('N/A') ? 'highlightNA' : ''}
    `;
  };

  const openModal = (category) => {
    const { title, description } = categoriesInfo[category];
    if (title && description) {
        setModalTitle(title);
        setModalContent(description);
        setIsModalOpen(true);
    } else {
        console.error(`Категория '${category}' не найдена`);
    }
};

  return (
    <div className= "periodic-table-container">
      <h1 className= "header-text">Periodic Table</h1> 
    <div className="periodic-table">
      
      <div className="left-panel">
        {selectedElement && (
          <div className="selected-element-info">
            <div
              className={`enlarged-cell ${getClassByClassification(
                selectedElement
              )} ${getClassByCategory(selectedElement)}`}>
              <span className="atomic-number">
                {selectedElement.atomicNumber}
              </span>
              <br />
              <span className="symbol">
                {selectedElement.symbol}
              </span>
              <br />
              <span className="name">{selectedElement.name}</span>
              <br />
              <span>{selectedElement.atomicMass}</span>
            </div>
            <div className="infobox">
              <p>Агрегатное состояние: {selectedElement.state}</p>
              <p>Электроотрицательность: {selectedElement.electronegativity}</p>
              <p>Температура плавления: {selectedElement.meltingPoint} °C</p>
              <p>Температура кипения: {selectedElement.boilingPoint} °C</p>
              <p>
                Энергия сродства к электрону: {selectedElement.electronAffinity}{' '}
                кДж/моль
              </p>
              <p>
                Энергия ионизации: {selectedElement.ionizationEnergy} кДж/моль
              </p>
              <p>Радиус: {selectedElement.atomicRadius} пм</p>
            </div>
          </div>
        )}
      </div>

      <div className="right-part">
        <div className="buttons">
        <button
          className="nonmetals-category-button"
            onClick={() => openModal('nonmetalsCategory')}
            onMouseOver={() => setShowOnlyNonmetalsCategory(true)}
            onMouseOut={() => setShowOnlyNonmetalsCategory(false)}>
            Неметаллы
        </button>
            <button
                className="metals-category-button"
                onClick={() => openModal('metals')} // Измените на 'metals'
                onMouseOver={() => setShowOnlyMetalsCategory(true)}
                onMouseOut={() => setShowOnlyMetalsCategory(false)}>
                Металлы
            </button>
          <button
            className="noble-gases-button"
            onClick={() => openModal('nobleGases')}
            onMouseOver={() => setShowOnlyNobleGases(true)}
            onMouseOut={() => setShowOnlyNobleGases(false)}>
            Благородные <br /> газы
          </button>
          <button
            className="nonmetals-button"
            onClick={() => openModal('nonmetals')}
            onMouseOver={() => setShowOnlyNonmetals(true)}
            onMouseOut={() => setShowOnlyNonmetals(false)}>
            Неметаллы
          </button>
          <button
            className="semimetals-button"
            onClick={() => openModal('semimetals')}
            onMouseOver={() => setShowOnlySemimetals(true)}
            onMouseOut={() => setShowOnlySemimetals(false)}>
            Полуметаллы
          </button>
          <button
            className="transition-metals-button"
            onClick={() => openModal('transitionMetals')}
            onMouseOver={() => setShowOnlyTransitionMetals(true)}
            onMouseOut={() => setShowOnlyTransitionMetals(false)}>
            Переходные <br /> металлы
          </button>
          <button
            className="postmetals-button"
            onClick={() => openModal('postmetals')}
            onMouseOver={() => setShowOnlyPostMetals(true)}
            onMouseOut={() => setShowOnlyPostMetals(false)}>
            Постпереходные <br /> металлы
          </button>
          <button
            className="lantanoids-button"
            onClick={() => openModal('lantanoids')}
            onMouseOver={() => setShowOnlyLantanoids(true)}
            onMouseOut={() => setShowOnlyLantanoids(false)}>
            Лантаноиды
          </button>
          <button
            className="actinoids-button"
            onClick={() => openModal('actinoids')}
            onMouseOver={() => setShowOnlyActinoids(true)}
            onMouseOut={() => setShowOnlyActinoids(false)}>
            Актиноиды
          </button>
          <button
            className="alkali-earth-metals-button"
            onClick={() => openModal('alkaliEarthMetals')}
            onMouseOver={() => setShowOnlyAlkaliEarthMetals(true)}
            onMouseOut={() => setShowOnlyAlkaliEarthMetals(false)}>
            Щелочноземель-
            <br />
            ные металлы
          </button>
          <button
            className="alkali-metals-button"
            onClick={() => openModal('alkaliMetals')}
            onMouseOver={() => setShowOnlyAlkaliMetals(true)}
            onMouseOut={() => setShowOnlyAlkaliMetals(false)}>
            Щелочные <br /> металлы
          </button>

          <button
            className="solid-button"
            onMouseOver={() => setHighlightSolid(true)}
            onMouseOut={() => setHighlightSolid(false)}>
            Твердое тело
          </button>

          <button
            className="liquid-button"
            onMouseOver={() => setHighlightLiquid(true)}
            onMouseOut={() => setHighlightLiquid(false)}>
            Жидкость
          </button>

          <button
            className="gases-button"
            onMouseOver={() => setHighlightGases(true)}
            onMouseOut={() => setHighlightGases(false)}>
            Газ
          </button>

          <button
            className="NA-button"
            onMouseOver={() => setHighlightNA(true)}
            onMouseOut={() => setHighlightNA(false)}>
            Неизвестно
          </button>
          <text className="group6">6</text>
          <text className="group7">7</text>
        </div>

        

        <div className="groups">
          {Array.from({ length: 18 }, (_, i) => (
            <div
              key={i + 1}
              className="group-number">
              {i + 1}
            </div>
          ))}
        </div>

        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((period) => (
          <div
            key={period}
            className={`period period-${period}`}>
            {period <= 7 ? (
              <div className="period-number">{period}</div>
            ) : (
              <div className="period-number" />
            )}
            <div className="row">
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              ].map((group) => {
                const element = elementsData.find(
                  (e) => e.period === period && e.group === group
                );
                const hideElement =
                  element &&
                  ((showOnlyNobleGases &&
                    !element.classification.includes('благородные газы')) ||
                    (showOnlyNonmetals &&
                      !element.classification.includes('неметаллы')) ||
                    (showOnlySemimetals &&
                      !element.classification.includes('полуметаллы')) ||
                    (showOnlyTransitionMetals &&
                      !element.classification.includes('переходные металлы')) ||
                    (showOnlyPostMetals &&
                      !element.classification.includes('постметаллы')) ||
                    (showOnlyLantanoids &&
                      !element.classification.includes('лантаноиды')) ||
                    (showOnlyActinoids &&
                      !element.classification.includes('актиноиды')) ||
                    (showOnlyAlkaliEarthMetals &&
                      !element.classification.includes(
                        'щелочноземельные металлы'
                      )) ||
                    (showOnlyAlkaliMetals &&
                      !element.classification.includes('щелочные металлы')) ||
                    (showOnlyNonmetalsCategory &&
                      !element.category.includes('неметалл')) ||
                    (showOnlyMetalsCategory &&
                      !element.category.includes('!металл')) ||
                    (showOnlyGases && !element.state.includes('газ')) ||
                    (showOnlySolid && !element.state.includes('твердое')) ||
                    (showOnlyLiquid && !element.state.includes('жидкость')) ||
                    (showOnlyNA && !element.state.includes('N/A')));

                return (
                  <div
                    key={group}
                    className={`cell ${
                      element ? getClassByClassification(element) : 'empty'
                    } ${element ? getClassByCategory(element) : ''} ${
                      hideElement ? 'hide' : ''
                    }`}
                    onClick={() => element && handleClick(element)}>
                    {element ? (
                      <>
                        <span className="atomic-number">
                          {element.atomicNumber}
                        </span>
                        <br />
                        <span
                          className="symbol"
                          >
                          {element.symbol}
                        </span>
                        <br />
                        <span className="name">{element.name}</span>
                        <br />
                        <span className="mass">{element.atomicMass}</span>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>

    {isModalOpen && (
                <Modal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={modalTitle}
                    content={modalContent}
                />
            )}

    </div>
  );
};

export default PeriodicTable;
