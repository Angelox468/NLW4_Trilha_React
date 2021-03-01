import { createContext, useState, ReactNode, useEffect, VoidFunctionComponent} from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';


interface Challenge{
  type: 'boy' | 'eye'
  description: string;
  amount: number;
}

interface ChallengesContextData{
  level: number ;
  currentExperience:number ;
  experienceToNextLevel: number;
  challangesCompleted:number;
  activeChallenge: Challenge;
  levelUp:() => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
  
}

interface ChallangesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
    }



export const ChallengesContext = createContext({} as ChallengesContextData );

export function ChallengesProvider({
  children, 
  ...rest
}: ChallangesProviderProps){
  const [level, setlevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challangesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const experienceToNextLevel = Math.pow((level+1)*4, 2)

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challangesCompleted));
  },[level, currentExperience, setChallengesCompleted]);

  

  function levelUp(){
    setlevel(level +1);
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false);
  }
  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random () * challenges.length)
    const challenge = challenges [randomChallengeIndex];

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge (){
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge){
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience= currentExperience + amount;

    if (finalExperience>= experienceToNextLevel) {
      finalExperience= finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challangesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider value={{ 
      level, 
      currentExperience,
      challangesCompleted,
      levelUp,
      startNewChallenge,
      activeChallenge, 
      resetChallenge,
      experienceToNextLevel,
      completeChallenge,
      closeLevelUpModal,

        }}
        >
      {children}

      { isLevelUpModalOpen && <LevelUpModal/> } 
    </ChallengesContext.Provider>
  );
}