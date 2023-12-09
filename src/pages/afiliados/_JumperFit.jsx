import { ButtonCopyLink, Loading } from '@/components'
import { getDadosAfiliado, getPlanos, getUnidades } from '@/redux/actions/afiliados'
import { setBrowserURL } from '@/redux/slices/global'
import utils from '@/utils'
import { Button, Col, Collapse, Input, Modal, Row, Space, Table, Typography, message, theme } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { LuCheckCircle2 } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'

const { Panel } = Collapse

const columns = (setLinkID, dados, usuario, employee) => {
  return [
    {
      title: 'Jumper Fit',
      dataIndex: 'nome',
      key: 'nome'
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: 100,
      render: (_, record) => {
        const linkFinal = `https://novo.pratiquefitness.com.br/checkoutpageplano/${record.unidade.slug}?pl=${
          record.plano
        }&saver=${record.saver}&obs=AFILIADO|${dados.token}|${dados.separador}|NULL|${
          employee ? employee : usuario.isAffiliate
        }|AFILIADO`

        return (
          <Button
            type="primary"
            onClick={() => {
              utils.copyTextToClipboard(linkFinal)
              setLinkID(linkFinal)
            }}
          >
            Link
          </Button>
        )
      }
    }
  ]
}

export default function JumperFit({ employee }) {
  const [linkID, setLinkID] = useState('')
  const [dataSearch, setDataSearch] = useState([])
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const { unidades, planos, planosLoading, loading } = useSelector(state => state.afiliados)
  const { usuario } = useSelector(state => state.login)
  const inputRef = useRef(null)

  const searchData = e => {
    const value = e.currentTarget.value
    const dataFiltered = utils.fieldSearch(unidades, value, 'unidade')
    setSearch(value)
    setDataSearch(dataFiltered)
  }

  const list = search ? dataSearch : unidades

  const handleButtonClick = credits => {
    // Construct the link based on the selected credits
    const link = `https://novo.pratiquefitness.com.br/checkoutpageplano/pedra-branca-?pl=418&saver=teste&obs=AFILIADO|bdfd0b64da6255bdb1658ba11e770fac|1|NULL|${
      employee ? employee : usuario.isAffiliate
    }|AFILIADO`

    // Use the link as needed, for example, open in a new tab
    window.open(link, '_blank')
  }

  return (
    <Loading spinning={loading}>
      {/* ... (existing code) */}
      <Space direction="vertical" className="w-100">
        {/* ... (existing code) */}
        <Space direction="horizontal" align="center">
          <Button type="primary" onClick={() => handleButtonClick('12')}>
            12 créditos
          </Button>
          <Button type="primary" onClick={() => handleButtonClick('24')}>
            24 créditos
          </Button>
        </Space>
        <Collapse className="planos_academia" accordion>
          {/* ... (existing code) */}
        </Collapse>
      </Space>
    </Loading>
  )
}
