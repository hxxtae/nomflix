import * as S from './style';

function Footer() {
  console.log('Footer');

  return (
    <S.FooterWrapper>
      <div>
        <span>© 2022 - Hee Tae Kim & ReactMasterClass in NomardCode.</span>
      </div>
      <S.FooterBox>
        <a title="깃 허브" href="https://github.com/hxxtae" target='_blank' rel="noopener noreferrer" >
          <i className="fab fa-github"></i>
        </a>
        <a title="노마드코더" href="https://nomadcoders.co/" target="_blank" rel="noopener noreferrer" >
          <img src="https://nomadcoders.co/m.svg" alt="" aria-labelledby="노마드코더" aria-required="true" className="sc-ksdxgE cDENRo" />
        </a>
      </S.FooterBox>
    </S.FooterWrapper>
  )
}

export default Footer;
