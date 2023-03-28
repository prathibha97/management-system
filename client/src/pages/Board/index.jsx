import React, { useState } from 'react';
import KanbanBoard from '../../components/KanbanBoard';

function Board() {

  const [numTasks, setNumTasks] = useState(0);


  return (
    <div className='h-[100%] w-full overflow-x-auto'>
      <KanbanBoard numTasks={numTasks} setNumTasks={setNumTasks}/>
    </div>
  )
}

export default Board