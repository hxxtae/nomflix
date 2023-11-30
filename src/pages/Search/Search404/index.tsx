import * as S from './style';

interface ISearch404 {
  searchText: string;
}

function Search404({ searchText }: ISearch404) {
  return (
    <S.Section>
      <S.Wrapper>
        <S.GuideContent>{`Your search for "${searchText}" did not have any matches.`}</S.GuideContent>
        <S.GuideContent>{`Suggestions:`}</S.GuideContent>
        <S.Content>
          <li>Try different keywords</li>
          <li>Looking for a movie or TV show?</li>
          <li>Try using a movie, TV show title, an actor or director</li>
          <li>Try a genre, like comedy, romance, sports, or drama</li>
        </S.Content>
      </S.Wrapper>
    </S.Section>
  )
}

export default Search404;
