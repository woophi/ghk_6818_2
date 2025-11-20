import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Gap } from '@alfalab/core-components/gap';
import { SuperEllipse } from '@alfalab/core-components/icon-view/super-ellipse';
import { PureCell } from '@alfalab/core-components/pure-cell';
import { Spinner } from '@alfalab/core-components/spinner';
import { Typography } from '@alfalab/core-components/typography';
import { ArrowRightMIcon } from '@alfalab/icons-glyph/ArrowRightMIcon';
import { TicketStarMIcon } from '@alfalab/icons-glyph/TicketStarMIcon';
import { CupMIcon } from '@alfalab/icons-rocky/CupMIcon';
import { useEffect, useState } from 'react';
import bg from './assets/bg.png';
import fire from './assets/fire.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { sendDataToGA } from './utils/events';
import { formatWord } from './utils/words';

const generateRandomNumbers = (count: number, min: number, max: number): number[] => {
  const randomNumbers: number[] = [];

  for (let i = 0; i < count; i++) {
    // Generate a random number between min and max (inclusive)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
};

const setRandomSelected = () => {
  const selected: { row: number; col: number }[] = [];
  while (selected.length < SELECT_NUMBERS_COUNT) {
    const randRow = Math.floor(Math.random() * 6);
    const randCol = Math.floor(Math.random() * 6);
    if (!selected.some(si => si.row === randRow && si.col === randCol)) {
      selected.push({ row: randRow, col: randCol });
    }
  }
  return selected;
};

const get6Rows = () => [
  generateRandomNumbers(6, 1, 99),
  generateRandomNumbers(6, 1, 99),
  generateRandomNumbers(6, 1, 99),
  generateRandomNumbers(6, 1, 99),
  generateRandomNumbers(6, 1, 99),
  generateRandomNumbers(6, 1, 99),
];

const SELECT_NUMBERS_COUNT = 5;

const TICKETS = [0, 1, 2];
const TICKET_PRICE = 200;

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [step, setStep] = useState<'init' | 'numbers'>('init');
  const [numbersData, setNumbersData] = useState<
    {
      comboNumbers: number[][];
      selectedComboIndexes: { row: number; col: number }[];
    }[]
  >([
    {
      comboNumbers: get6Rows(),
      selectedComboIndexes: setRandomSelected(),
    },
  ]);

  const comboCounts = numbersData.reduce(
    (acc, combo) => acc + (combo.selectedComboIndexes.length >= SELECT_NUMBERS_COUNT ? 1 : 0),
    0,
  );

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  const submit = () => {
    if (loading) return;
    window.gtag('event', 'and_jackpot_nov_finish_var2');
    setLoading(true);

    sendDataToGA({
      engage_price: TICKET_PRICE * comboCounts,
    }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  if (step === 'numbers') {
    return (
      <>
        <div className={appSt.container}>
          <PureCell className={appSt.rowBanner}>
            <PureCell.Graphics>
              <img src={fire} width={24} height={24} alt="fire" />
            </PureCell.Graphics>
            <PureCell.Content>
              <PureCell.Main>
                <Typography.Text view="primary-medium">Больше комбинаций — выше шансы на выигрыш</Typography.Text>
              </PureCell.Main>
            </PureCell.Content>
          </PureCell>

          {TICKETS.map(ticketIndex => (
            <div key={ticketIndex}>
              <div
                className={appSt.combo({
                  active: numbersData[ticketIndex]?.selectedComboIndexes.length === SELECT_NUMBERS_COUNT,
                })}
              >
                <Typography.Text view="primary-medium">Комбинация {ticketIndex + 1}</Typography.Text>
                {numbersData[ticketIndex] && numbersData[ticketIndex].selectedComboIndexes.length ? null : (
                  <ButtonMobile
                    view="text"
                    className={appSt.comboBtn}
                    onClick={() => {
                      window.gtag('event', 'and_jackpot_nov_choose_var2');
                      setNumbersData(
                        numbersData.concat([
                          {
                            comboNumbers: get6Rows(),
                            selectedComboIndexes: setRandomSelected(),
                          },
                        ]),
                      );
                    }}
                  >
                    Выбрать
                  </ButtonMobile>
                )}
              </div>
              {numbersData[ticketIndex] && (
                <div
                  className={appSt.comboBot({
                    active: numbersData[ticketIndex].selectedComboIndexes.length === SELECT_NUMBERS_COUNT,
                  })}
                >
                  <div className={appSt.steps}>
                    <div className={appSt.step({ active: numbersData[ticketIndex].selectedComboIndexes.length >= 1 })} />
                    <div className={appSt.step({ active: numbersData[ticketIndex].selectedComboIndexes.length >= 2 })} />
                    <div className={appSt.step({ active: numbersData[ticketIndex].selectedComboIndexes.length >= 3 })} />
                    <div className={appSt.step({ active: numbersData[ticketIndex].selectedComboIndexes.length >= 4 })} />
                    <div
                      className={appSt.step({
                        active: numbersData[ticketIndex].selectedComboIndexes.length >= SELECT_NUMBERS_COUNT,
                      })}
                    />
                  </div>

                  <div className={appSt.numbersGrid}>
                    {numbersData[ticketIndex].comboNumbers.map((row, rowIndex) =>
                      row.map((rowNumber, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={appSt.numbersGridItem({
                            active: numbersData[ticketIndex].selectedComboIndexes.some(
                              si => si.row === rowIndex && si.col === colIndex,
                            ),
                          })}
                        >
                          {rowNumber}
                        </div>
                      )),
                    )}
                  </div>

                  <ButtonMobile
                    block
                    view="secondary"
                    size={40}
                    onClick={() => {
                      window.gtag('event', `and_jackpot_nov_combination_${ticketIndex + 1}_var2`);
                      setNumbersData(
                        numbersData.map((combo, comboIndex) => {
                          if (comboIndex !== ticketIndex) return combo;

                          return {
                            ...combo,
                            selectedComboIndexes: setRandomSelected(),
                          };
                        }),
                      );
                    }}
                  >
                    Изменить комбинацию
                  </ButtonMobile>
                </div>
              )}
            </div>
          ))}
        </div>
        <Gap size={96} />

        {comboCounts > 0 && (
          <div className={appSt.bottomBtn}>
            <div className={appSt.likeBtn} onClick={submit}>
              <div>
                <Typography.Text view="primary-small" tag="p" defaultMargins={false}>
                  {TICKET_PRICE * comboCounts} ₽
                </Typography.Text>
                <Typography.Text view="primary-small">
                  {formatWord(comboCounts, ['комбинация', 'комбинации', 'комбинаций'])}
                </Typography.Text>
              </div>
              <SuperEllipse backgroundColor="#FFFFFF" size={48}>
                {loading ? (
                  <Spinner style={{ margin: '0 auto', height: '24px' }} visible preset={24} />
                ) : (
                  <ArrowRightMIcon color="#212124" />
                )}
              </SuperEllipse>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.box}>
          <Typography.TitleResponsive tag="h1" view="large" font="system" weight="bold">
            Альфа Мани
          </Typography.TitleResponsive>
          <Typography.Text view="primary-medium" color="secondary">
            Выиграйте погашение кредита
          </Typography.Text>

          <img src={bg} height={270} width="100%" className={appSt.img} />
        </div>

        <Typography.Text view="primary-medium">
          Участвуйте в Альфа Мани! У вас есть шанс полностью закрыть кредит или сократить ежемесячные платежи. Возможный
          выигрыш - до 5 000 000 рублей.
        </Typography.Text>
        <Typography.Text view="primary-medium">Маленький вклад сегодня — большая победа завтра.</Typography.Text>

        <div className={appSt.row}>
          <CupMIcon style={{ flexShrink: 0 }} />

          <Typography.Text view="primary-medium">Погасите кредит по цене чашки кофе!</Typography.Text>
        </div>
        <div className={appSt.row}>
          <TicketStarMIcon style={{ flexShrink: 0 }} />

          <Typography.Text view="primary-medium">
            Участвуйте и получите погашение ежемесячного платежа или всего кредита
          </Typography.Text>
        </div>
      </div>
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile
          shape="rounded"
          block
          view="primary"
          onClick={() => {
            window.gtag('event', 'and_jackpot_nov_luck_var2');
            setStep('numbers');
          }}
        >
          <Typography.TitleResponsive tag="h2" view="small" font="system" weight="bold">
            Испытать удачу
          </Typography.TitleResponsive>
        </ButtonMobile>
      </div>
    </>
  );
};
