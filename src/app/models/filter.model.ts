export class Filter {
    q?: { by?: string, text?: string }
    instructor?: string
    user?: string
    category?: string
    level?: 'basic' | 'medium' | 'advanced' | ''
}