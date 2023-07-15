import cis from '@/constants/cis'
import { apiNovoPower } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {
  const email = 'design@pratiquefitness.com.br'
  const cargo = 'MARKETING'
  //const { email, cargo } = req.body

  const ciTerm = cis.find(i => i.cargo === cargo).ci || 'CI MUSCULAÇÃO'

  const cisList = await apiNovoPower.$queryRawUnsafe(
    `SELECT DISTINCT wp_posts.id, wp_posts.post_title, wp_posts.post_name, wp_posts.post_excerpt, wp_posts.guid, wp_posts.post_type, featured_image.guid as post_image, wp_posts.post_modified, wp_users.display_name FROM wp_posts INNER JOIN wp_postmeta ON wp_posts.id = wp_postmeta.post_id AND wp_postmeta.meta_key = '_thumbnail_id' INNER JOIN wp_posts AS featured_image ON featured_image.id = wp_postmeta.meta_value INNER JOIN wp_users ON wp_users.id = wp_posts.post_author INNER JOIN wp_term_relationships rel ON wp_posts.ID = rel.object_id INNER JOIN wp_term_taxonomy taxonomy ON rel.term_taxonomy_id = taxonomy.term_taxonomy_id INNER JOIN wp_terms terms ON taxonomy.term_id = terms.term_id WHERE wp_posts.post_status = 'publish' AND terms.name = '${ciTerm}' AND wp_posts.post_modified >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)`
  )

  const data = await Promise.all(
    cisList.map(async ci => {
      const usuarioExist = await apiNovoPower.wp_users.findMany({
        where: {
          user_login: email
        }
      })

      if (usuarioExist.length) {
        const passou = await apiNovoPower.wp_comments.findMany({
          where: {
            comment_type: 'course_completed',
            user_id: usuarioExist[0].ID,
            comment_post_ID: ci.id,
            comment_approved: 'approved'
          }
        })
        if (!passou.length) {
          return ci
        } else {
          return ci
        }
      } else {
        return ci
      }
    })
  )

  res.status(200).json(utils.clearDatabaseResult(data.filter(n => n)))
}
