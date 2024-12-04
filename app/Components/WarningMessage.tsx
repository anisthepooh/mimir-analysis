import { AnimatePresence, motion } from 'framer-motion';
import { TriangleAlert } from 'lucide-react';
import useStore from '../_store';

const WarningMessage = () => {
  const {warning, isWarningOpen} = useStore()
  return (
      <AnimatePresence>
        {isWarningOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="flex gap-2 items-center text-yellow-800 bg-yellow-100 rounded-lg px-4 py-1 text-sm font-medium"
            >
              <TriangleAlert size={16} className="text-yellow-400" />
              {warning}
            </motion.div>
        )}
      </AnimatePresence>
)
}

export default WarningMessage;
