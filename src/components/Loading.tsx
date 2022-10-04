import styled from 'styled-components';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

import { loadVariants } from '../constants';

const Loader = styled(motion.div)`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loading() {
  return (
    <Loader>
      <motion.div variants={ loadVariants } initial="before" animate="start">
        <FontAwesomeIcon icon={faSpinner} size={'2x'} />
      </motion.div>
    </Loader>
  )
}

export default Loading;
