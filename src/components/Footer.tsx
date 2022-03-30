import styled from 'styled-components';

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 70px 0;
  box-shadow: 0 -10px 50px rgba(255, 255, 255, 1);
`;
const FooterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  padding-top: 20px;

  i {
    font-size: 20px;

    &:first-child {
      margin-right: 50px;
    }
  }

  img {
    width: 30px;
    height: 100%;
  }
`;

function Footer() {
  console.log('Footer');
  

  return (
    <FooterWrapper>
      <div>
        <span>© 2022 - Hee Tae Kim & ReactMasterClass in NomardCode.</span>
      </div>
      <FooterBox>
        <a href="https://github.com/hxxtae" target="_blank" title="깃 허브" className="sc-bqiRlB gThtPW">
          <i className="fab fa-github"></i>
        </a>
        <a title="노마드코더" href="https://nomadcoders.co/" target="_blank" className="sc-bqiRlB gThtPW">
          <img src="https://nomadcoders.co/m.svg" alt="" aria-labelledby="노마드코더" aria-required="true" className="sc-ksdxgE cDENRo" />
        </a>
      </FooterBox>
    </FooterWrapper>
  )
}

export default Footer;
