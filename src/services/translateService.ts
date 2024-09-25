import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser, OutputFixingParser } from 'langchain/output_parsers'
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts'
import { createOpenAIFunctionsAgent, AgentExecutor } from 'langchain/agents'
import { TavilySearchResults } from '@langchain/community/tools/tavily_search'
import { z } from 'zod'

export default async (word: string, inputLanguage = 'english', outputLanguage = 'russian') => {
  const system = `You are a helpful assistant that translates from ${inputLanguage} to ${outputLanguage} language.`

  const input = `
    Translate '${word}' with max 5 variants.
    Return data in JSON format according following format: { translate: string, translates: string[] }.
  `
  const model = new ChatOpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo-1106' })

  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      translate: z.string().describe('The main translated text'),
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

  return fixParser.parse(response.output)
}
