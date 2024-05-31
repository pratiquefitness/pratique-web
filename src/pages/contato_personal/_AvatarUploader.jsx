import { Avatar, Typography, Upload, message } from 'antd'
import { setLoadingAvatar } from '@/redux/slices/conta'
import { uploadAvatar } from '@/redux/actions/conta'
import { UserOutlined, SyncOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import utils from '@/utils'

const AvatarUploader = ({props}) => {
  const dispatch = useDispatch()
  const { usuario } = useSelector(state => state.login)
  const { loadingAvatar } = useSelector(state => state.conta)

  const checkUpload = file => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('Você só pode fazer upload de arquivos de imagem!')
    }
    const isSizeValid = file.size / 1024 / 1024 < 2
    if (!isSizeValid) {
      message.error('O tamanho máximo da imagem deve ser de 2MB.')
    }
    return isImage && isSizeValid
  }

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      dispatch(setLoadingAvatar(true))
    }
    if (info.file.status === 'done') {
      dispatch(setLoadingAvatar(false))
    }
  }

  const customRequest = async ({ file }) => {
    try {
      const resizedBase64 = await utils.resizeAndConvertToBase64(file)
      dispatch(uploadAvatar(resizedBase64))
    } catch (error) {
      message.error('Falha ao converter imagem.')
    }
  }

  return (
    <div className="text-center mt-6">
     {loadingAvatar ? (
          <Avatar size={100} icon={<SyncOutlined spin />} />
        ) : props ? (
          <Avatar size={100} src={props} />
        ) : (
          <Avatar size={100} icon={<UserOutlined spi />} />
        )}
    </div>
  )
}

export default AvatarUploader
