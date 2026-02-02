

# Fotoindikator med klickbar preview

## Sammanfattning
Lägg till en klickbar fotoindikator i komponentheadern som öppnar en fullskärmsvisning av bilderna direkt, utan att behöva expandera komponenten först.

---

## Ny design

### Komponentheader med fotoindikator

```text
┌───────────────────────────────────────────────────────┐
│ Vägg 2                                   [📷 2]     ∨ │
└───────────────────────────────────────────────────────┘
```

Kameraknappen är klickbar och öppnar en lightbox/dialog med bilderna.

### Lightbox-dialog

```text
┌─────────────────────────────────────────────────────────┐
│                                                     [X] │
│                                                         │
│                    ┌─────────────────┐                  │
│                    │                 │                  │
│                    │   [Stor bild]   │                  │
│                    │                 │                  │
│                    └─────────────────┘                  │
│                                                         │
│                      ● ○ ○                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Samma stil som redan finns i PhotoGallery-komponenten.

---

## Teknisk implementation

### Fil: InspectionReadOnly.tsx

**1. Nytt state för foto-dialog:**

```typescript
const [photoDialog, setPhotoDialog] = useState<{
  photos: string[];
  label: string;
  currentIndex: number;
} | null>(null);
```

**2. Uppdaterad komponentheader:**

```typescript
const photos = room.componentPhotos?.[component as keyof typeof room.componentPhotos] || [];
const hasPhotos = photos.length > 0;

<AccordionTrigger className="px-3 py-2.5 hover:bg-accent/30 text-sm">
  <div className="flex items-center justify-between w-full pr-2">
    <span className={`font-medium ${isRemark ? '' : 'text-muted-foreground'}`}>
      {getComponentLabel(component)}
    </span>
    {hasPhotos && (
      <button
        onClick={(e) => {
          e.stopPropagation(); // Förhindrar att accordion öppnas
          setPhotoDialog({
            photos,
            label: getComponentLabel(component),
            currentIndex: 0
          });
        }}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-xs"
      >
        <Camera className="h-3 w-3" />
        {photos.length}
      </button>
    )}
  </div>
</AccordionTrigger>
```

**3. Lightbox-dialog (ny render-funktion):**

```typescript
const renderPhotoDialog = () => {
  if (!photoDialog) return null;
  
  return (
    <Dialog open={!!photoDialog} onOpenChange={() => setPhotoDialog(null)}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
        <div className="relative">
          <img
            src={photoDialog.photos[photoDialog.currentIndex]}
            alt={`${photoDialog.label} foto ${photoDialog.currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
          {photoDialog.photos.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {photoDialog.photos.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === photoDialog.currentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                  onClick={() => setPhotoDialog({ ...photoDialog, currentIndex: idx })}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

---

## Användarflöde

1. Användaren ser kamera-ikon + antal i komponentheadern
2. Klickar på ikonen → fullskärmsdialog öppnas
3. Kan bläddra mellan bilder via prickarna i botten
4. Klickar utanför eller på X → dialogen stängs
5. Accordion-expandering påverkas inte (stopPropagation)

---

## Sammanfattning av ändringar

| Ändring | Före | Efter |
|---------|------|-------|
| Fotoindikator | Saknas i header | Kamera + antal synlig |
| Klickbar preview | Måste expandera först | Direkt från header |
| Lightbox | Endast i PhotoGallery | Återanvänd mönster |

---

## Filer som påverkas

| Fil | Ändring |
|-----|---------|
| `InspectionReadOnly.tsx` | Lägg till fotoindikator i header + lightbox-dialog |

