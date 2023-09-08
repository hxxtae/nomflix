import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

import * as S from './style';

function Loading() {
  return (
    <S.Loader>
      <motion.div variants={ S.loadVariants } initial="before" animate="start">
        <FontAwesomeIcon icon={faSpinner} size={'2x'} />
      </motion.div>
    </S.Loader>
  )
}

export default Loading;
