import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';

export default function Home() {
  return (
    <main>
      <TaskList />
      <TaskInput />
    </main>
  );
}
