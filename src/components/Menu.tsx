import React, { FC } from 'react';
import '../styles/menu.scss';
import MenuButton from './MenuButton';
import { EModes } from './Enums/EModes';
import MenuQuestion from './MenuQuestion';
import ICategoryResponse from './Interfaces/ICategoryResponse';

interface IProps {
  setGameState: React.Dispatch<React.SetStateAction<EModes>>;
  mode: EModes;
  questionsCount?: number;
  setQuestionsCount?: React.Dispatch<React.SetStateAction<number>>;
  category: ICategoryResponse[] | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number>>;
}

const Menu: FC<IProps> = ({
  setGameState,
  mode,
  questionsCount,
  setQuestionsCount,
  category,
  setSelectedCategory,
}) => {
  const handleChangeOption = (event: React.FormEvent<HTMLSelectElement>) => {
    console.log(event.currentTarget.value);
    setSelectedCategory(parseInt(event.currentTarget.value));
  };

  const createOptions = () => {
    if (category && category.length > 0) {
      const options = category.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ));
      return (
        <select
          className="menu__item"
          onChange={(event) => handleChangeOption(event)}
        >
          <option value={0}>Random</option>
          {...options}
        </select>
      );
    } else {
      alert('connection error');
    }
  };

  const menuSelect = () => {
    if (mode === EModes.init) {
      return (
        <>
          <MenuButton
            setGameState={setGameState}
            mode={EModes.play}
            value="Play"
          />
          {createOptions()}
          <MenuQuestion
            setQuestionsCount={setQuestionsCount}
            questionsCount={questionsCount}
          />

          <MenuButton
            setGameState={setGameState}
            mode={EModes.scores}
            value="Scores"
          />
        </>
      );
      // } else if (mode === EModes.paused) {
      //   return (
      //     <>
      //       <MenuButton
      //         setGameState={setGameState}
      //         mode={EModes.play}
      //         value="Continue"
      //       />
      //       <MenuButton
      //         setGameState={setGameState}
      //         mode={EModes.init}
      //         value="Exit"
      //       />
      //     </>
      //   );
    }
  };

  return (
    <>
      <div className="menu">{menuSelect()}</div>
    </>
  );
};

export default Menu;
