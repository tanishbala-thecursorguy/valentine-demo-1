import { useState } from 'react';
import { QuestionScreen } from './components/QuestionScreen';
import { SuccessScreen } from './components/SuccessScreen';
import { FloatingHearts } from './components/FloatingHearts';

export default function App() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingHearts />
      
      {!accepted ? (
        <QuestionScreen onAccept={() => setAccepted(true)} />
      ) : (
        <SuccessScreen />
      )}
    </div>
  );
}
