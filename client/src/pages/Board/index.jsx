import React from 'react';
import KanbanBoard from '../../components/KanbanBoard';

function Board() {

  return (
    <div className='h-[100%] w-full overflow-x-auto'>
      <KanbanBoard />
    </div>
  )
}

export default Board