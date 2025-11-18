import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  backgroundColor: '#fff',
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});

const box = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  borderRadius: '24px',
  gap: '8px',
  background: 'linear-gradient(180deg, rgba(255, 69, 34, 0) 0%, rgba(255, 69, 34, 0.1) 100%);',
  marginBottom: '1rem',
});

const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  borderRadius: '24px',
  border: '2px solid #F3F4F5',
  padding: '1rem',
});

const img = style({
  objectFit: 'cover',
  marginBottom: '-16px',
  objectPosition: 'top',
  marginTop: '8px',
});

const textTitle = style({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  marginTop: '1rem',
  gap: '8px',
});

const rowBanner = style({
  borderRadius: '1rem',
  border: '2px solid #BABBC2',
  padding: '1rem',
});

const combo = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    borderRadius: '20px',
    backgroundColor: '#2637580F',
    padding: '20px',
    transition: 'background-color 0.3s ease-in-out',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '#EEEDFF',
      },
    },
  },
});
const comboBot = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    borderRadius: '20px',
    backgroundColor: '#2637580F',
    padding: '20px',
    transition: 'background-color 0.3s ease-in-out',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '#EEEDFF',
      },
    },
  },
});

const comboBtn = style({
  color: '#2A77EF',
});

const steps = style({
  display: 'grid',
  width: '100%',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '4px',
});

const step = recipe({
  base: {
    height: '4px',
    borderRadius: '8px',
    backgroundColor: '#050B2C2E',
    transition: 'background-color 0.3s ease-in-out',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '#212124',
      },
    },
  },
});

const numbersGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gridTemplateRows: 'repeat(6, 1fr)',
  gap: '4px',
  width: '100%',
});

const numbersGridItem = recipe({
  base: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease-in-out',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '#897EFF',
        color: '#FFFFFF',
      },
    },
  },
});

const likeBtn = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  borderRadius: '20px',
  padding: '1rem',
  cursor: 'pointer',
  backgroundColor: '#212124',
  color: '#FFFFFF',
});

export const appSt = {
  bottomBtn,
  container,
  box,
  row,
  img,
  textTitle,
  rowBanner,
  combo,
  comboBtn,
  comboBot,
  steps,
  step,
  numbersGrid,
  numbersGridItem,
  likeBtn,
};
