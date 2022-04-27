import { Comment } from '../types'
import { CommentTagFragment } from './CommentTagFragment'

export type CommentFragmentOptions = {
  /**
   * Determines whether or not to highlight the short text.
   */
  highlightTitle?: boolean
}

// note: we are displaying remarks and examples in a separate section and we are not
// displaying @docs tags because they usually refer to the same documentation
const excludedTags = ['remarks', 'alias', 'example', 'deprecated', 'docs']

/**
 * Creates a comment documentation fragment.
 *
 * @param comment - Comment for which to create the documentation
 * @param options - Comment fragment options
 * @returns Comment documentation fragment
 */
export const CommentFragment = (
  { shortText, returns = '', tags }: Comment,
  { highlightTitle = false }: CommentFragmentOptions = {}
) =>
  `${highlightTitle ? (shortText ? `## ${shortText}` : '') : shortText || ``}

${
  tags
    ? tags
        .filter(({ tag }) => !excludedTags.includes(tag))
        .concat(returns ? { tag: 'returns', text: returns } : { tag: ``, text: `` })
        .map(CommentTagFragment)
        .join('\n\n')
    : returns
    ? CommentTagFragment({ tag: 'returns', text: returns })
    : ``
}`

export default CommentFragment