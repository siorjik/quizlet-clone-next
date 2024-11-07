import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser, OutputFixingParser } from 'langchain/output_parsers'
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts'
import { createOpenAIFunctionsAgent, AgentExecutor } from 'langchain/agents'
import { TavilySearchResults } from '@langchain/community/tools/tavily_search'
import { z } from 'zod'

import { languageOptions } from '@/utils/constants'

const getUniqueString = (arr: string[]): string => {
  const resArr = arr.map(item => item.split(', ')).flat()

  return Array.from(new Set(resArr)).join(', ')
}

const getMappedTranslates = (data: string[]): string[] => {
  let res: string[] = []
  let index = 0

  while (index < data.length) {
    res = [...res, getUniqueString([...res, data[index]])]

    index += 1
  }

  return res
}

export default async (word: string, inputLanguage: string, outputLanguage: string) => {
  const system = `You are an expert translator.`

  const input = `
    Translate '${word}' with unique variants
    from ${languageOptions.find(item => item.value === inputLanguage)?.label.toLowerCase()}
    to ${languageOptions.find(item => item.value === outputLanguage)?.label.toLowerCase()}.
    Return data in JSON format according following format: { translate: string, translates: string[] }.
  `
  const model = new ChatOpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo-1106', maxTokens: 100 })

  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      translates: z.array(z.string()).describe('The list of minor translated texts'),
    })
  )

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', system],
    ['user', '{input}'],
    new MessagesPlaceholder('agent_scratchpad'),
  ])

  const fixParser = OutputFixingParser.fromLLM(model, parser)

  const tools = [new TavilySearchResults()]

  const agent = await createOpenAIFunctionsAgent({
    llm: model,
    prompt,
    tools,
  })

  const agentExecutor = new AgentExecutor({ agent, tools })

  const response = await agentExecutor.invoke({ input })

  const res: { translates: string[] } = await fixParser.parse(response.output)

  const uniqueTranslates = Array.from(new Set(res.translates))

  return getMappedTranslates([...uniqueTranslates])
}
