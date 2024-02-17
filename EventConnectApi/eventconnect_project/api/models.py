from django.db import models
from django.conf import settings
from django.template.defaultfilters import slugify
from django.db.models.signals import m2m_changed
from django.dispatch import receiver


# Create your models here.
class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Event(TimeStampedModel):
    name: str = models.CharField(max_length=100)
    slug = models.SlugField(max_length=110)
    date = models.DateTimeField(format('%Y-%m-%d %H:%M:%S'))
    location = models.URLField()
    description = models.TextField()
    image = models.URLField(blank=True, null=True)
    about = models.TextField()

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL,
                                   on_delete=models.CASCADE,
                                   related_name='events')

    assistants = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                        related_name='assistant',
                                        blank=True)

    assistants_count = models.IntegerField(default=0)

    # manager
    objects = models.Manager()

    class Meta:
        ordering = ('-created',)
        indexes = [
            models.Index(fields=['-created'])
        ]

    def update_counts(self):
        """
        Update the assistants and interested counts
        """
        self.assistants_count = self.assistants.count()
        self.save()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name


@receiver(m2m_changed, sender=Event.assistants.through)
def update_event_counts(sender, instance, **kwargs):
    """
    Update the assistants and interested counts
    """
    instance.update_counts()
