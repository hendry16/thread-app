import Button from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'], // supaya otomatis buat dokumentasi
  argTypes: {
    text: { control: 'text' },
    type: { control: { type: 'select', options: ['button', 'submit', 'reset'] } },
    hidden: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    text: 'Click Me',
    type: 'button',
    hidden: false,
  },
};

export const Hidden = {
  args: {
    text: 'You can\'t see me',
    hidden: true,
  },
};

export const Submit = {
  args: {
    text: 'Submit Form',
    type: 'submit',
    hidden: false,
  },
};

export const Reset = {
  args: {
    text: 'Reset Form',
    type: 'reset',
    hidden: false,
  },
};
