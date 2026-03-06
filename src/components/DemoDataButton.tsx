import { useCVStore } from '../store/cvStore';
import { Button } from './ui/button';

export const DemoDataButton = () => {
  const { loadDemo } = useCVStore();
  return <Button type="button" onClick={loadDemo}>Wczytaj dane demo</Button>;
};
