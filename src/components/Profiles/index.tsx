import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { atomOfProfileData } from '../../global';
import { api, dto } from '../../apis';
import * as S from './style';
import Skeleton from '../Skeleton';

interface IProfiles {
  onChoiseProfile: () => void;
}

function Profiles({ onChoiseProfile }: IProfiles) {
  const [users, setUsers] = useState<dto.IProfilesData[]>([]);
  const setProfileState = useSetRecoilState(atomOfProfileData);

  const onProfileClick = (profile: dto.IProfilesData) => {
    onChoiseProfile();
    setProfileState((prev) => ({
      ...prev,
      ...profile
    }));
  }

  useEffect(() => {
    const profilesFetch = async () => {
      try {
        const data = await api.getProfiles();
        setUsers(() => [
          ...data
        ])
      } catch (err) {
        console.error(`Profiles Fetch Error: ${err}`);
      }
    }
    profilesFetch();
  }, []);

  return (
    <S.Wrapper>
      <S.Heading>Who's watching?</S.Heading>
      <S.List>
        {(users && users?.length > 0) ? users.map(item => (
          <S.Item key={item.id} onClick={() => onProfileClick(item)}>
            <S.Box layoutId='profile' url={item.background_path} />
            <S.Title>{item.name}</S.Title>
          </S.Item>
        )) :
          <>
            <Skeleton classes='profile-square' />
            <Skeleton classes='profile-square' />
          </>
        }
      </S.List>
    </S.Wrapper>
  )
}

export default Profiles;
