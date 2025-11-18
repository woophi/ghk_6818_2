import { Typography } from '@alfalab/core-components/typography';
import rocket from '../assets/rocket.png';
import { thxSt } from './style.css';

export const ThxLayout = () => {
  return (
    <>
      <div className={thxSt.container}>
        <img src={rocket} width={230} height={230} className={thxSt.rocket} />
        <Typography.TitleResponsive style={{ margin: '24px 0 12px' }} font="system" tag="h1" view="large" weight="semibold">
          Ваши интересы — наше вдохновение
        </Typography.TitleResponsive>
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
          Спасибо за участие! Мы проводим исследование для нового сервиса. Скоро расскажем о нём подробнее, следите за
          новостями!
        </Typography.Text>
      </div>
    </>
  );
};
