'use client'

import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'

interface CaptchaProps {
  onValidate: (isValid: boolean, correctAnswer: number, userAnswer: string) => void
}

export default function Captcha({ onValidate }: CaptchaProps) {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1
    const n2 = Math.floor(Math.random() * 10) + 1
    setNum1(n1)
    setNum2(n2)
    setUserAnswer('')
    setIsCorrect(null)
    onValidate(false, n1 + n2, '')
  }

  const validateCaptcha = () => {
    const correct = parseInt(userAnswer) === num1 + num2
    setIsCorrect(correct)
    onValidate(correct, num1 + num2, userAnswer)
  }

  useEffect(() => {
    const n1 = Math.floor(Math.random() * 10) + 1
    const n2 = Math.floor(Math.random() * 10) + 1
    setNum1(n1)
    setNum2(n2)
    onValidate(false, n1 + n2, '')
  }, [])

  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>
        Security Check: What is {num1} + {num2}?
      </label>
      <div className='flex space-x-2'>
        <input
          type='text'
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onBlur={validateCaptcha}
          className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
          placeholder='Your answer'
          inputMode='numeric'
          pattern='[0-9]*'
        />
        <button
          type='button'
          onClick={generateCaptcha}
          className='p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
          title='Refresh captcha'
        >
          <RefreshCw className='w-5 h-5 text-gray-600' />
        </button>
      </div>
      {isCorrect === false && (
        <p className='text-sm text-red-600'>Incorrect answer. Please try again.</p>
      )}
      {isCorrect === true && (
        <p className='text-sm text-green-600'>Correct!</p>
      )}
    </div>
  )
}