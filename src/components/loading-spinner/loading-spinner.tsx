import * as S from './loading-spinner.styled'
function LoadingSpinner(props: S.SpinnerProps) {
  const {size = 50, borderWidth = 4, color = '#333', margin = '0'} = props;
  return (
    <S.SpinnerWrapper>
      <S.Spinner size={size} borderWidth={borderWidth} color={color} margin={margin}/>
    </S.SpinnerWrapper>
  );
}

export default LoadingSpinner;
