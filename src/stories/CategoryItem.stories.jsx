import CategoryItem from '../components/CategoryItem';

export default {
  title: 'Components/CategoryItem',
  component: CategoryItem,
  tags: ['autodocs'],
  argTypes: {
    category: { control: 'text' },
    isActive: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export const Default = {
  args: {
    category: 'React',
    isActive: false,
  },
};

export const Active = {
  args: {
    category: 'Angular',
    isActive: true,
  },
};
