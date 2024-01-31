import React, { useEffect } from 'react'
import { Embed } from 'powerbi-client-react'
import * as powerbi from 'powerbi-client'

const PowerBiEmbed = () => {
  useEffect(() => {
    const embedConfiguration = {
      type: 'report',
      id: '6d7e9f2e-d737-47e8-88e6-8ad39069ef3b',
      embedUrl:
        '<iframe title="Ativos" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=2bd32044-edbb-4a38-877a-97691fc8d846&autoAuth=true&ctid=6d7e9f2e-d737-47e8-88e6-8ad39069ef3b" frameborder="0" allowFullScreen="true"></iframe>',
      tokenType: powerbi.models.TokenType.Embed,
      accessToken: 'SEU_ACCESS_TOKEN',
      settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: false
      }
    }

    const embedContainer = document.getElementById('embedContainer')
    const embed = powerbi.embed(embedContainer, embedConfiguration)

    return () => {
      embed.off('loaded')
      embed.destroy()
    }
  }, [])

  return <div id="embedContainer" style={{ height: '600px' }}></div>
}

export default PowerBiEmbed
