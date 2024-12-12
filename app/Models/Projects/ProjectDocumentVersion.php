<?php

namespace App\Models\Projects;

use App\Models\Users\User;
use InvalidArgumentException;
use App\Models\Projects\Project;
use App\Services\ProjectService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;
use App\Models\Projects\ProjectDocumentVersionUpdate;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProjectDocumentVersion extends Model
{
    use HasFactory;

    protected $fillable = [
        'version',
        'document_number',
        'release_date',
        'deadline',
        // 'is_auto',
        'project_document_id',
    ];

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function check_auto()
    {
        $deadlineCarbon = Carbon::parse($this->deadline);
        $nowDate = Carbon::now();

        try {
        // Log::info("Deadline: " . $deadlineCarbon);
        // Log::info("Now: " . $nowDate);
        // Log::info("Is deadline greater than or equal to now? (Method 1): " . $deadlineCarbon->gte($nowDate));
        // Log::info("Is deadline greater than or equal to now? (Method 2): " . $nowDate->gte($deadlineCarbon));    
        // Log::info("Checking auto-generation for document version ID: {$this->id}");
        // Log::info("Document is_auto: " . ($this->document->is_auto ? 'true' : 'false'));
        // Log::info("Document deadline: " . $this->deadline);
        // Log::info("Current time: " . now());

        if ($this->document->is_auto && ($nowDate->gte($deadlineCarbon) )) {
            Log::info("Condition met: Storing new version for document ID: {$this->id}");
            $this->storeNewVersion();
        } else {
           Log::info("Condition not met. Document is_auto: " . ($this->document->is_auto) . ", Deadline is/later than now: " . ($nowDate->gte($deadlineCarbon)) . ", Deadline (Carbon): " . $deadlineCarbon . ", Sekarang: " . now()) ;
        }
    } catch (\Exception $e) {
        logger()->error('Failed to auto-generate version', [
            'document_id' => $this->id,
            'error' => $e->getMessage(),
        ]);
    }
    }

    public function testing()
    {
        return 'testing';
    }

    public function storeNewVersion()
    {
     DB::beginTransaction();
        try {
            $now = now();
            // Generate version name based on deadline interval
            $versionName = match ($this->document->deadline_interval) {
                1 => $now->format('Ymd'), // Daily
                2 => 'Week ' . $now->weekOfMonth . ' ' . $now->format('F Y'), // Weekly
                3 => $now->format('F Y'), // Monthly
                4 => $now->format('Y'), // Monthly
                default => throw new InvalidArgumentException('Invalid deadline interval.'),
            };
            

            $deadline = $this->projectService->calculateDeadline();

            $this->versions()->create([
                'version' => $versionName,
                'document_number' => $this->generateDocumentNumber(),
                'release_date' => $now->toDateTimeString(), 
                'deadline' => $deadline->toDateTimeString(), 
            ]);
            Log::info("Condition met: Storing new version for document ID: {$this->id} are completed");
            DB::commit();
        } catch (\Exception $e) {
            Log::info("Condition not met: Storing new version for document ID: {$this->id} are failed");
            DB::rollBack();
            throw $e; 
        }   
    }

    public function document()
    {
        return $this->belongsTo(ProjectDocument::class, 'project_document_id');
    }

    public function updates()
    {
        return $this->hasMany(ProjectDocumentVersionUpdate::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
