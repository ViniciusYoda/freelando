import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    cores: {
      branco: string; atencao: string; focus: string
      primarias: Record<'a' | 'b' | 'c', string>
      secundarias: Record<'a' | 'b' | 'c', string>
      neutras: Record<'a' | 'b' | 'c' | 'd', string>
      dark: Record<'a' | 'b' | 'd', string>
    }
    espacamentos: Record<'xs' | 's' | 'm' | 'l' | 'xl', string>
    fontFamily: string
  }
}
