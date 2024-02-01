import React, { useState } from 'react';
import TimerComponent from './component/timer';
import './App.css';

interface blogs {
  id: number,
  title: string,
  content: string,
  date : string
  likes : number
}

const App: React.FC = () => {
  const [blogs, setBlogs] = useState<blogs[]>([
    { id: 0, title: '미움받을용기', content: '컨텐츠1', date: '몇월며칠', likes: 0},
    { id: 1, title: '더 마인드', content: '컨텐츠2', date: '몇월며칠', likes: 0},
    { id: 2, title: '도둑맞은 집중력',content: '컨텐츠3', date: '몇월며칠', likes: 0}
  ]);

  const updateTitle = (index: number) : void => {
    setBlogs(prevBlogs => {
      const newBlogs = [...prevBlogs];
      newBlogs[index] = {...newBlogs[index], title: '들이박을 용기'};
      return newBlogs;
    })
  }

  const increaseLikes = (index: number): void => {
    setBlogs(prevBlogs => {
      const newBlogs = [...prevBlogs];
      newBlogs[index] = { ...newBlogs[index], likes: newBlogs[index].likes + 1 };
      return newBlogs;
    });
  };

  return (
    <>
      <header>
        나의 블로그
      </header>
      <div className='content-container'>
        {blogs.map((blog, index) => (
          <div className='content' key={index}>
            <div>{blog.title}</div>
            <button onClick={() => updateTitle(index)}>title 변경</button>
            <div>🐶: {blog.likes}</div>
            <button onClick={() => increaseLikes(index)}>좋아요 추가</button>
            <div>발행 날짜: {blog.date}</div>
          </div>
        ))}
        </div>
      <TimerComponent></TimerComponent>
    </>
  );
};

export default App;